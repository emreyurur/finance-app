'use client';

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction, updateTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";
import { z } from "zod";

// 🚨 zod tipi çıkarılıyor
type TransactionFormType = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  initialData?: TransactionFormType & { id?: string }; // id güncelleme için gerekli
}

export default function TransactionForm({ initialData }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormType>({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split('T')[0],
      type: 'Income',
      category: '',
      description: '',
      amount: 0,
    },
  });

  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const type = watch("type");
  const editing = Boolean(initialData?.id);

  useEffect(() => {
    if (type !== "Expense") {
      setValue("category", "");
    }
  }, [type, setValue]);

  const onSubmit = async (data: TransactionFormType) => {
    setSaving(true);
    setLastError(null);
    try {
      if (editing && initialData?.id) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      setLastError(error instanceof Error ? error.message : String(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <Label className="mb-1">Type</Label>
          <Select {...register("type")}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <FormError error={errors.type} />
        </div>

        {/* Category */}
        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register("category")} disabled={type !== "Expense"}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <FormError error={errors.category} />
        </div>

        {/* Date */}
        <div>
          <Label className="mb-1">Date</Label>
          <Input type="date" {...register("created_at")} disabled={editing} />
          <FormError error={errors.created_at} />
        </div>

        {/* Amount */}
        <div>
          <Label className="mb-1">Amount</Label>
          <Input
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />
          <FormError error={errors.amount} />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input {...register("description")} />
          <FormError error={errors.description} />
        </div>
      </div>

      {/* Error & Button */}
      <div className="flex justify-between items-center">
        <div>{lastError && <FormError error={lastError} />}</div>
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
