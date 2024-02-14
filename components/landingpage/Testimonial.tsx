const Testimonial = () => {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8 bg-base-300">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-3xl text-primary font-semibold leading-9 text-center">
          Devocode
        </h2>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8  sm:text-2xl sm:leading-9">
            <p>
              “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              expedita voluptas culpa sapiente alias molestiae. Numquam corrupti
              in laborum sed rerum et corporis.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold ">Judith Black</div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-neutral-50"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-neutral-400">CEO of Workcation</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
