import { createProduct } from "@/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(_, variables) {
      // const cached = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products", id, name], (data: any) => {
        return [
          ...data,
          {
            id: variables.id,
            name: variables.name,
            price: variables.price,
          },
        ];
      });
    },
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        id: "",
        name: data.name,
        price: data.price,
      });

      toast.success("Produto cadastrado com sucesso", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar produto", {
        position: "top-right",
      });
      console.error(error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar um novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Produto</Label>
          <Input {...register("name")} className="col-span-3" id="name" />
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Preço</Label>
          <Input
            {...register("price")}
            className="col-span-3"
            id="price"
            placeholder="Ex: 99.90"
            onKeyPress={(event) => {
              if (!/[0-9.]+/g.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
