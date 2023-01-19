import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewIteam = () => {

  const [data, setData] = useState<any>();

  const id = useParams();

  const getData = async () => {
    try {
      const url = `http://localhost:5000/data/${id.id}`
      const result: any = await axios.get(url);
      debugger
      setData(result.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [])
  useEffect(() => {
    getData();
  }, [data])

  return (
    <div>
      {data &&
        <h1>{data.Name}</h1>
      }

    </div>
  )
}

export default ViewIteam