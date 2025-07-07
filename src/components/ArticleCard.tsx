import clsx from "clsx";
import React from "react";

type ArticleCardProp = {
  id: number;
  img_src: string;
  selectedArticle: null | number;
  setSelectedArticle: (id: number) => void;
  sm: boolean;
};

export default React.memo(function ArticleCard(props: ArticleCardProp) {
  return (
    <div
      onClick={() => props.setSelectedArticle(props.id)}
      className={clsx(
        props.sm ? "w-[80px] h-[80px]" : "w-full h-auto",
        "rounded-2xl p-2 md:w-[150px] md:h-[150px] aspect-square cursor-pointer transition shadow-md border-2",
        props.selectedArticle === props.id
          ? "border-3 bg-[var(--color-blue-primary)] border-[var(--color-blue-dark)] shadow-lg"
          : "border-[var(--color-blue-dark)] bg-[var(--color-blue-light)] hover:bg-[var(--color-blue-primary)] hover:border-[var(--color-blue-primary)] hover:shadow-xl hover-border-0"
      )}
    >
      <img
        src={props.img_src}
        alt=""
        className="object-contain w-full h-full rounded-xl"
      />
    </div>
  );
});
