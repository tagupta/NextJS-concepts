import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          userName: data[key].username,
          volume: data[key].volume,
        });
      }
      return transformedData;
    });

const LastSalesPage = () => {
  //   const [saleData, setSaleData] = useState();
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  //   useEffect(() => {
  //     if (data) {
  //       const transformedData = [];
  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           userName: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSaleData(transformedData);
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedData = [];
  //         for (const key in data) {
  //           transformedData.push({
  //             id: key,
  //             userName: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSaleData(transformedData);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
