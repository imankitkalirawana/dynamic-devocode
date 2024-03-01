import Image from "next/image";

const Testimonial = () => {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8 bg-base-300">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-3xl text-primary font-semibold leading-9 text-center">
          Know our Developers
        </h2>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8  sm:text-2xl sm:leading-9">
            <p>
              “Technology and AI have the power to change our world, but it's up
              to us to ensure it's for the betterment of humanity.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <a href="https://github.com/imankitkalirawana" target="_BLANK">
              <Image
                className="mx-auto rounded-full"
                src="/imankitkalirawana.jpg"
                alt=""
                width={100}
                height={100}
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold ">Bhuneshvar</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-base-content"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-base-content text-sm">
                  Divinely Developer
                </div>
              </div>
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
