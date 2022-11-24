import { useEffect, useState } from "react";


const useSortColumn = (data) => {
    const [sortedData, setSortedData] = useState(data);
    const [columns, setColumns] = useState(second)

    useEffect(() => {
      setSortedData(data);
    }, [data]);

    const handleSort = (arg, type) => {
      setColumns({ ...columns, [arg]: columns[arg] * -1 });
      setSortedData(
        sortedData
          ?.map((item) => item)
          .sort((a, b) => {
            if (type === "date") {
              return toggle[arg] * (new Date(a[arg]) - new Date(b[arg]));
            } else if (type === "number") {
              return toggle[arg] * (a[arg] - b[arg]);
            } else {
              if (toggle[arg] === 1) {
                return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
              } else {
                return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
              }
            }
          })
      );
    };


  return {handleSort,sortedData,columns}
}

export default useSortColumn