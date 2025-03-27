

const Review = () => {
  return (
    <div className="min-w-52 max-w-60 py-4 ">
      <div className="bg-white rounded-xl shadow-xl">
        <div className="flex flex-col gap-2 px-2 py-4">
          <div className=" flex items-center gap-2">
            <img
              src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
              alt="user profile photo"
              className="w-10 h-10 rounded-full "
            />
            <div className="font-roboto flex items-center gap-1">
              <h2 className="text-sm font-semibold">Justin </h2>
              <p className="text-xs">Myanmar</p>
            </div>
          </div>
          <p className="font-serif text-xs  line-clamp-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quod sint amet unde eligendi repudiandae debitis fugit, consequatur
            quibusdam minus esse natus excepturi quasi architecto voluptate?
            Sint perferendis dignissimos rem?
          </p>
        </div>
        <div className="flex items-center justify-end gap-1 mt-2 border-t border-t-gray-400 py-2">
          <div className="font-roboto">
            <h3 className="text-sm text-right font-semibold">Good</h3>
            <p className="text-xs">230 reviews</p>
          </div>
          <div className="font-roboto bg-blue-700 py-2 px-3 text-sm rounded-lg text-white">
            8
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
