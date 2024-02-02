import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { CreateProductDialog } from "../components/create-product-dialog";
import { ProductsFilters } from "../components/products-filters";
import { Button } from "../components/ui/button";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Product, getProducts } from "../data/products";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";

export function Products() {
  // const { data } = useFetch<Product[]>(
  //   "http://127.0.0.1:3333/api/products/list"
  // );

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const { data: products } = useQuery({
    queryKey: ["products", id, name],
    queryFn: () => getProducts({ id, name }),
  });

  // const { data: data } = useQuery("data", () => useFetch("http://127.0.0.1:3333/api/products/list"));

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="font-bold text-3xl">Produtos</h1>
      <div className="flex items-center justify-between">
        <ProductsFilters />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <CreateProductDialog />
        </Dialog>
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
          </TableHeader>
          <TableBody>
            {products?.map((product: Product) => {
              return (
                <TableRow key={product.id}>
                  {/* <TableCell>{product?.id?.substring(0, 5)}</TableCell> */}
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
