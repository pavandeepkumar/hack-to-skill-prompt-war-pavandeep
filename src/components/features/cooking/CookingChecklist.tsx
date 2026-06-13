"use client";

import { useState } from "react";
import { Clock, ChevronDown, CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CookingTask, TaskStatus, TaskPriority } from "@/types";

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  low: { label: "Low", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
};

const statusIcons: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  "in-progress": PlayCircle,
  done: CheckCircle2,
};

interface CookingChecklistProps {
  tasks: CookingTask[];
}

export function CookingChecklist({ tasks: initialTasks }: CookingChecklistProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const progress = tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0;

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next: TaskStatus =
          t.status === "done" ? "todo" : t.status === "todo" ? "in-progress" : "done";
        if (next === "done") {
          toast.success(`"${t.title}" completed! 🎉`);
        }
        return { ...t, status: next };
      })
    );
  }

  const grouped = {
    high: tasks.filter((t) => t.priority === "high"),
    medium: tasks.filter((t) => t.priority === "medium"),
    low: tasks.filter((t) => t.priority === "low"),
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{doneCount}/{tasks.length}</p>
            <p className="text-xs text-muted-foreground">Tasks done</p>
          </div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% complete</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
            {grouped.high.length} High
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">
            {grouped.medium.length} Medium
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">
            {grouped.low.length} Low
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task, i) => {
            const StatusIcon = statusIcons[task.status];
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={cn(
                    "overflow-hidden transition-all",
                    task.status === "done" && "opacity-60"
                  )}
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value={task.id} className="border-0">
                      <CardHeader className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          {/* Status toggle */}
                          <button
                            onClick={() => toggleTask(task.id)}
                            aria-label={`Toggle task: ${task.title}`}
                            className="mt-0.5 shrink-0 transition-colors"
                          >
                            <StatusIcon
                              className={cn(
                                "h-5 w-5",
                                task.status === "done" && "text-emerald-500",
                                task.status === "in-progress" && "text-primary",
                                task.status === "todo" && "text-muted-foreground"
                              )}
                            />
                          </button>

                          <div className="flex-1 min-w-0">
                            <AccordionTrigger className="py-0 hover:no-underline">
                              <div className="flex items-center gap-2 min-w-0 pr-2">
                                <p
                                  className={cn(
                                    "text-sm font-semibold text-left truncate",
                                    task.status === "done" && "line-through text-muted-foreground"
                                  )}
                                >
                                  {task.title}
                                </p>
                              </div>
                            </AccordionTrigger>
                            <div className="flex items-center gap-2 flex-wrap mt-1">
                              <span
                                className={cn(
                                  "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                                  priorityConfig[task.priority].className
                                )}
                              >
                                {priorityConfig[task.priority].label}
                              </span>
                              {task.mealName && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                  {task.mealName}
                                </Badge>
                              )}
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span className="text-[10px]">{task.estimatedMinutes}m</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <AccordionContent>
                        <CardContent className="pt-0 px-4 pb-4">
                          <Separator className="mb-3" />
                          <p className="text-xs text-muted-foreground mb-3">
                            {task.description}
                          </p>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold">Steps:</p>
                            <ol className="space-y-1.5">
                              {task.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs">
                                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[10px] font-bold shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="text-muted-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
