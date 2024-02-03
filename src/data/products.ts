import { removerSpecials } from "@/lib/utils";
import axios from "axios";

export interface Product {
  id: string | null;
  name: string;
  price: number;
}

interface GetProductsFilters {
  id: string | null;
  name: string | null;
}

export async function getProducts({ id, name }: GetProductsFilters) {
  //delay de 1s
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // return [{ id: "3e72c", name: "Camisa", price: 54 }];

  // let products = [
  //   { id: "3e72c", name: "Camisa", price: 54 },
  //   { id: "1b71a", name: "Calça", price: 71 },
  //   { id: "d5a4e", name: "Tênis", price: 27 },
  //   { id: "f6fbb", name: "Boné", price: 75 },
  //   { id: "041bd", name: "Jaqueta", price: 49 },
  //   { id: "4f418", name: "Bermuda", price: 30 },
  //   { id: "3be6a", name: "Meia", price: 56 },
  //   { id: "1ed3d", name: "Sapato", price: 43 },
  //   { id: "d2fde", name: "Óculos", price: 79 },
  //   { id: "16eb7", name: "Relógio", price: 64 },
  //   { id: "1efb8", name: "Cinto", price: 57 },
  //   { id: "7b13c", name: "Carteira", price: 26 },
  //   { id: "a7793", name: "Blusa", price: 69 },
  //   { id: "ce37e", name: "Vestido", price: 35 },
  //   { id: "b1f3f", name: "Sandália", price: 44 },
  //   { id: "63cf3", name: "Shorts", price: 23 },
  //   { id: "3d8e1", name: "Chapéu", price: 63 },
  //   { id: "04e8c", name: "Luvas", price: 52 },
  //   { id: "c9535", name: "Lenço", price: 72 },
  //   { id: "9a03a", name: "Pulseira", price: 38 },
  // ];

  // if (id) {
  //   products = products.filter((product) => product.id.includes(id));
  // }

  // if (name) {
  //   products = products.filter((product) =>
  //     removerSpecials(product.name.toLowerCase()).includes(
  //       removerSpecials(name.toLowerCase())
  //     )
  //   );
  // }

  // return products

  // console.log("data", data);

  const response = await axios.get("http://127.0.0.1:3333/api/products/list");

  if (id) {
    return response.data.data.filter((product: Product) =>
      product?.id?.trim().includes(id.trim())
    );
  }

  if (name) {
    return response.data.data.filter((product: Product) =>
      removerSpecials(product.name.toLowerCase()).includes(
        removerSpecials(name.toLowerCase())
      )
    );
  }

  return response.data.data;
}

export async function createProduct({ name, price }: Product) {
  //delay de 1s
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await axios.post(
    "http://127.0.0.1:3333/api/products/store",
    { name, price }
  );

  return response;
}
