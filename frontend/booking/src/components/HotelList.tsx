import useFetch from "../../hooks/usefetch";

const HotelList = () => {
  const { data, loading, error } = useFetch("api/hotel?featured=true&limit=2");
  console.log(data);
  const list = [
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      city: "Dublin",
      count: 0,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      city: "Austin",
      count: 10,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      city: "Dublin",
      count: 0,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      city: "London",
      count: 122,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      city: "Dublin",
      count: 0,
    },
  ];
  return (
    <section>
      <h1 className="title">Browse by property type</h1>
      <div className="hotel-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.map((item, i) => (
            <div key={i} className="hotel-card">
              <img src={list[i].url} alt={"photo of " + item.city} />

              <h1>{item.name}</h1>
              <p>{item.cheapetPrice}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default HotelList;
