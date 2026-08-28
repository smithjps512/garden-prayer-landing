"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useDB,
  id,
  blankQuestion,
  saveQuiz,
  setDisplayName,
  quizProblems,
} from "@/lib/ctos/store";
import { TOPICS } from "@/lib/ctos/topics";
import type { Question, Visibility } from "@/lib/ctos/types";

/** The story caps how many questions can be selected at once for deletion. */
const MAX_SELECTED = 5;
const MAX_CHOICES = 6;

/**
 * The quiz builder, built to the layout in the CTOS user story:
 *
 *   "the required tools in order to build a quiz are on the left hand side.
 *    '+' makes the questions, '-' deletes a selected question, some
 *    selected (up to 5), or all. The question layout has the Question and the
 *    Answers. Click or tap the arrow button to finalize the quiz."
 */
function Builder() {
  const router = useRouter();
  const params = useSearchParams();
  const { db, update } = useDB();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topicSlug, setTopicSlug] = useState<string>(params.get("topic") ?? "");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [questions, setQuestions] = useState<Question[]>([blankQuestion()]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showProblems, setShowProblems] = useState(false);

  const activeId = openId ?? questions[0]?.id ?? null;
  const active = questions.find((q) => q.id === activeId) ?? null;

  const problems = useMemo(
    () => quizProblems({ title, questions }),
    [title, questions]
  );

  const deletionCount = selectAll ? questions.length : selected.length;

  function patchQuestion(qid: string, patch: Partial<Question>) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qid ? { ...q, ...patch } : q))
    );
  }

  /* --- the three tools ------------------------------------------------ */

  function addQuestion() {
    const q = blankQuestion();
    setQuestions((prev) => [...prev, q]);
    setOpenId(q.id);
    setNotice(null);
  }

  function deleteSelected() {
    if (deletionCount === 0) {
      setNotice("Tick the questions you want to delete first.");
      return;
    }
    const doomed = selectAll ? new Set(questions.map((q) => q.id)) : new Set(selected);
    const remaining = questions.filter((q) => !doomed.has(q.id));
    setQuestions(remaining);
    setSelected([]);
    setSelectAll(false);
    setOpenId(remaining[0]?.id ?? null);
    setNotice(
      `Deleted ${doomed.size} question${doomed.size === 1 ? "" : "s"}.`
    );
  }

  function finalize() {
    if (problems.length > 0) {
      setShowProblems(true);
      return;
    }
    const quizId = id("quiz");
    const name = author.trim() || "Anonymous";

    update((current) =>
      setDisplayName(
        saveQuiz(current, {
          id: quizId,
          title: title.trim(),
          topicSlug: topicSlug || null,
          authorName: name,
          visibility,
          questions: questions.map((q) => ({
            ...q,
            choices: q.choices.filter((c) => c.text.trim()),
          })),
          createdAt: Date.now(),
        }),
        name
      )
    );

    router.push(`/ctos/quiz/${quizId}?created=1`);
  }

  /* --- selection ------------------------------------------------------ */

  function toggleSelected(qid: string) {
    setNotice(null);
    setSelectAll(false);
    setSelected((prev) => {
      if (prev.includes(qid)) return prev.filter((x) => x !== qid);
      if (prev.length >= MAX_SELECTED) {
        setNotice(`You can select up to ${MAX_SELECTED} questions at a time.`);
        return prev;
      }
      return [...prev, qid];
    });
  }

  const toolButton =
    "grid h-11 w-11 place-items-center rounded-xl border text-xl transition-colors disabled:opacity-30";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl tracking-tight text-white">Create a quiz</h1>
      <p className="mt-2 text-slate-400">
        Build the questions, then press the arrow to finalize.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[260px_1fr]">
        {/* Left hand side: the tools, then the question list. */}
        <aside className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={addQuestion}
              title="Add a question"
              aria-label="Add a question"
              className={`${toolButton} border-white/15 text-slate-200 hover:border-indigo-400/50 hover:bg-white/5`}
            >
              +
            </button>
            <button
              onClick={deleteSelected}
              title="Delete selected questions"
              aria-label="Delete selected questions"
              disabled={deletionCount === 0}
              className={`${toolButton} border-rose-400/30 text-rose-300 hover:bg-rose-400/10`}
            >
              {"−"}
            </button>
            <button
              onClick={finalize}
              title="Finalize the quiz"
              aria-label="Finalize the quiz"
              className={`${toolButton} ml-auto border-indigo-400/40 bg-indigo-500 text-white hover:bg-indigo-400`}
            >
              {"→"}
            </button>
          </div>

          {notice && (
            <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
              {notice}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {questions.length} question{questions.length === 1 ? "" : "s"}
            </span>
            {questions.length > 0 && (
              <button
                onClick={() => {
                  setSelectAll((v) => !v);
                  setSelected([]);
                  setNotice(null);
                }}
                className="font-medium text-slate-400 hover:text-white"
              >
                {selectAll ? "Clear selection" : "Select all"}
              </button>
            )}
          </div>

          <ul className="space-y-1.5">
            {questions.map((question, i) => {
              const checked = selectAll || selected.includes(question.id);
              return (
                <li
                  key={question.id}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors ${
                    activeId === question.id
                      ? "border-indigo-400/50 bg-indigo-400/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelected(question.id)}
                    aria-label={`Select question ${i + 1}`}
                    className="h-4 w-4 shrink-0 accent-rose-400"
                  />
                  <button
                    onClick={() => setOpenId(question.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="block truncate text-sm text-white">
                      {i + 1}. {question.prompt.trim() || "Untitled question"}
                    </span>
                  </button>
                </li>
              );
            })}
            {questions.length === 0 && (
              <li className="rounded-lg border border-dashed border-white/15 p-4 text-center text-xs text-slate-500">
                No questions. Press + to add one.
              </li>
            )}
          </ul>
        </aside>

        {/* Main area: quiz settings and the open question. */}
        <section className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Quiz title
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blue skies and red sunsets"
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-slate-600 outline-none focus:border-indigo-400/60"
              />
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Your name
                </span>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={db?.displayName ?? "Anonymous"}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-slate-600 outline-none focus:border-indigo-400/60"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Topic
                </span>
                <select
                  value={topicSlug}
                  onChange={(e) => setTopicSlug(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white outline-none focus:border-indigo-400/60"
                >
                  <option value="" className="bg-slate-900">
                    No topic
                  </option>
                  {TOPICS.map((t) => (
                    <option key={t.slug} value={t.slug} className="bg-slate-900">
                      {t.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-medium text-slate-300">
                Who can find it?
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "public" as const,
                      title: "Public",
                      blurb: "Listed on Encyclopedia. Anyone can find it.",
                    },
                    {
                      value: "private" as const,
                      title: "Private",
                      blurb: "Not listed. Only people with the link.",
                    },
                  ]
                ).map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-xl border p-3 transition-colors ${
                      visibility === option.value
                        ? "border-indigo-400/50 bg-indigo-400/10"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        checked={visibility === option.value}
                        onChange={() => setVisibility(option.value)}
                        className="h-4 w-4 accent-indigo-400"
                      />
                      <span className="font-medium text-white">
                        {option.title}
                      </span>
                    </span>
                    <span className="mt-1 block pl-6 text-xs text-slate-500">
                      {option.blurb}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {active ? (
            <QuestionEditor
              question={active}
              index={questions.findIndex((q) => q.id === active.id)}
              onChange={(patch) => patchQuestion(active.id, patch)}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-slate-500">
              Press + to add your first question.
            </div>
          )}

          {showProblems && problems.length > 0 && (
            <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4">
              <p className="text-sm font-medium text-rose-200">
                Not ready to finalize yet:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-200/80">
                {problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={finalize}
            className="w-full rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Finalize quiz {"→"}
          </button>
        </section>
      </div>
    </main>
  );
}

function QuestionEditor({
  question,
  index,
  onChange,
}: {
  question: Question;
  index: number;
  onChange: (patch: Partial<Question>) => void;
}) {
  function setChoiceText(choiceId: string, text: string) {
    onChange({
      choices: question.choices.map((c) =>
        c.id === choiceId ? { ...c, text } : c
      ),
    });
  }

  function addChoice() {
    if (question.choices.length >= MAX_CHOICES) return;
    onChange({
      choices: [
        ...question.choices,
        { id: `${question.id}_${question.choices.length}`, text: "" },
      ],
    });
  }

  function removeChoice(choiceId: string) {
    if (question.choices.length <= 2) return;
    onChange({
      choices: question.choices.filter((c) => c.id !== choiceId),
      correctChoiceId:
        question.correctChoiceId === choiceId ? null : question.correctChoiceId,
    });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          Question {index + 1}
        </span>
        <textarea
          value={question.prompt}
          onChange={(e) => onChange({ prompt: e.target.value })}
          rows={2}
          placeholder="Why is blue light scattered more than red light?"
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-slate-600 outline-none focus:border-indigo-400/60"
        />
      </label>

      <p className="mb-2 mt-5 text-sm font-medium text-slate-300">
        Answers{" "}
        <span className="font-normal text-slate-500">
          {"— "}tick the correct one
        </span>
      </p>

      <ul className="space-y-2">
        {question.choices.map((choice, i) => (
          <li key={choice.id} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={question.correctChoiceId === choice.id}
              onChange={() => onChange({ correctChoiceId: choice.id })}
              aria-label={`Mark answer ${i + 1} correct`}
              className="h-4 w-4 shrink-0 accent-emerald-400"
            />
            <input
              value={choice.text}
              onChange={(e) => setChoiceText(choice.id, e.target.value)}
              placeholder={`Answer ${i + 1}`}
              className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-white placeholder-slate-600 outline-none focus:border-indigo-400/60"
            />
            <button
              onClick={() => removeChoice(choice.id)}
              disabled={question.choices.length <= 2}
              aria-label={`Remove answer ${i + 1}`}
              className="shrink-0 rounded-lg border border-white/10 px-2.5 py-2 text-sm text-slate-500 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
            >
              {"×"}
            </button>
          </li>
        ))}
      </ul>

      {question.choices.length < MAX_CHOICES && (
        <button
          onClick={addChoice}
          className="mt-3 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          + Add another answer
        </button>
      )}
    </div>
  );
}

export default function NewQuizPage() {
  return (
    <Suspense fallback={null}>
      <Builder />
    </Suspense>
  );
}
