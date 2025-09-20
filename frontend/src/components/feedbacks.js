"use client";

import { useData } from "@/app/context/Context";
import Image from "next/image";

const Feedbacks = () => {
  const { feedbacks } = useData();
  return (
    <section className="w-full overflow-hidden">
      <h2 className="text-xl md:text-2xl lg:text-4xl text-center text-foreground font-bold">
        What People Say
      </h2>
      <div className="flex animate-scroll p-0.5">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="max-w-[480px] p-3 lg:p-4 space-y-2 bg-card/1 text-card-foreground rounded-md shadow-lg backdrop-blur-md"
          >
            <blockquote>
              &apos;&apos; {feedback.feedback} &apos;&apos;
            </blockquote>
            <div className="flex gap-2">
              <div className="w-10 h-10">
                <Image
                  src={feedback.avatarURL}
                  width={56}
                  height={56}
                  alt={feedback.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-bse font-semibold">{feedback.name}</h3>
                <p className="text-sm">{`${feedback.role}, ${feedback.company}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedbacks;
