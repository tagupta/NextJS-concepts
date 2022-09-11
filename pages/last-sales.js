import { useEffect, useState } from "react";
import useSWR from "swr";

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();
  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedData,
    },
    // revalidate: 10,
  };
}

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

const LastSalesPage = (props) => {
  const [saleData, setsaleData] = useState(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setsaleData(data);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !saleData) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {saleData.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
