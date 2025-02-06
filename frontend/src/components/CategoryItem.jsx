import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden">
      <Link to={`/category/${item.href}`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <img src={item.imageUrl} />

          <div className="absolute bottom-10 left-4 z-60">
            <p className='text-white text-xl font-bold'>{item.name}</p>
            <p className='text-gray-300 text-md '>Explore {item.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
