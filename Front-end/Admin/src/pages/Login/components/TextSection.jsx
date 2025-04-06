
  const TextSection = ({
    heading,
    paragraph,
    bullets,
  }) => {
    return (
      <div className="flex flex-col justify-center items-center gap-10 text-center">
        <h1
          className={`text-3xl font-semibold text-[#050A36]`}
        >
          {heading}
        </h1>
        <p className=" text-[#464853]">{paragraph}</p>
        <ul>
          {bullets.map((pt) => (
            <p className=" text-[#464853] text-left my-4">{pt}</p>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TextSection;
  