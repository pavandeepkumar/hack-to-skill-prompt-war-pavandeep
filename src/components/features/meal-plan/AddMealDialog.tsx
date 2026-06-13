"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const addMealSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  prepTime: z.number({ coerce: true }).min(0).max(480),
  cookTime: z.number({ coerce: true }).min(0).max(480),
  servings: z.number({ coerce: true }).min(1).max(20),
  calories: z.number({ coerce: true }).min(0).max(5000),
  cost: z.number({ coerce: true }).min(0).max(500),
  ingredients: z.string().min(5, "List at least one ingredient"),
});

type AddMealFormData = z.infer<typeof addMealSchema>;

interface AddMealDialogProps {
  defaultType?: string;
  onAdd?: (data: AddMealFormData) => void;
}

export function AddMealDialog({ defaultType, onAdd }: AddMealDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AddMealFormData>({
    resolver: zodResolver(addMealSchema),
    defaultValues: {
      name: "",
      type: (defaultType as AddMealFormData["type"]) ?? "dinner",
      description: "",
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      calories: 500,
      cost: 10,
      ingredients: "",
    },
  });

  function onSubmit(data: AddMealFormData) {
    onAdd?.(data);
    toast.success(`"${data.name}" added to your meal plan!`);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Meal</DialogTitle>
          <DialogDescription>
            Add a meal to your weekly plan. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            id="add-meal-form"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Grilled Salmon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                      <SelectItem value="lunch">☀️ Lunch</SelectItem>
                      <SelectItem value="dinner">🌙 Dinner</SelectItem>
                      <SelectItem value="snack">🍎 Snack</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the meal..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time grid */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="prepTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prep Time (min) *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cookTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Time (min) *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings *</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost ($) *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ingredients */}
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients * (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. 2 salmon fillets, 1 lemon, garlic..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" form="add-meal-form">
            Add Meal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
