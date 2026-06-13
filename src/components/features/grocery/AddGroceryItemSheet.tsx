"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const addItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.enum([
    "produce", "proteins", "dairy", "grains", "pantry",
    "frozen", "beverages", "snacks", "condiments", "other",
  ]),
  quantity: z.number({ coerce: true }).min(0.1, "Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  estimatedPrice: z.number({ coerce: true }).min(0, "Price must be non-negative"),
  notes: z.string().optional(),
});

type AddItemFormData = z.infer<typeof addItemSchema>;

interface AddGroceryItemSheetProps {
  onAdd?: (data: AddItemFormData) => void;
}

const categories = [
  { value: "produce", label: "🥦 Produce" },
  { value: "proteins", label: "🥩 Proteins" },
  { value: "dairy", label: "🥛 Dairy" },
  { value: "grains", label: "🌾 Grains" },
  { value: "pantry", label: "🫙 Pantry" },
  { value: "frozen", label: "🧊 Frozen" },
  { value: "beverages", label: "🧃 Beverages" },
  { value: "snacks", label: "🍿 Snacks" },
  { value: "condiments", label: "🫙 Condiments" },
  { value: "other", label: "📦 Other" },
];

const commonUnits = ["pcs", "lbs", "oz", "kg", "g", "cups", "tbsp", "tsp", "cans", "bags", "bottles", "loaf", "bunch", "pint", "gallon"];

export function AddGroceryItemSheet({ onAdd }: AddGroceryItemSheetProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AddItemFormData>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      name: "",
      category: "produce",
      quantity: 1,
      unit: "pcs",
      estimatedPrice: 0,
      notes: "",
    },
  });

  function onSubmit(data: AddItemFormData) {
    onAdd?.(data);
    toast.success(`${data.name} added to grocery list!`);
    setOpen(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Grocery Item</SheetTitle>
          <SheetDescription>
            Add an item to your weekly grocery list.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
            id="add-grocery-form"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Organic Spinach" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {commonUnits.map((u) => (
                          <SelectItem key={u} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="estimatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Price ($) *</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brand preference, size, etc."
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

        <SheetFooter className="mt-6">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-grocery-form"
            className="flex-1"
          >
            Add Item
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
