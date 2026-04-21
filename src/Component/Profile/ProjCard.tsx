import Image from 'next/image';

const ProjCard = ({ cardData }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <Image
          src={cardData?.image}
          alt={cardData?.title}
          height={500}
          width={500}
          className="w-full h-48 object-cover"
        />
        {/* <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {cardData?.tags.includes('Featured') && (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          {cardData?.tags.includes('Edit') && (
            <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Edit
            </span>
          )}
          {cardData?.tags.includes('Remove') && (
            <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Remove
            </span>
          )}
        </div> */}
      </div>
      <div className="px-3 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg  text-gray-900">{cardData?.title}</h2>
          <p className="text-sm text-gray-600">{cardData?.location}</p>
        </div>
        <div className="mt-2 flex  items-center space-x-2">
          <span className="flex items-center text-blue-600 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.64 11.09 1 7.545l6.061-.545L10 2l2.939 5 6.06.545-4.64 3.545 1.517 6.999z" />
            </svg>
          </span>
          {cardData?.rating}{' '}
          <span className="text-[#80898A]">(Client Rating)</span>
          <div>
            <span className="text-gray-700 mr-2 ">|</span>
            <span className="text-gray-700 ">
              Project Budget ${cardData?.budget}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjCard;
