import React from "react";

type BreadcrumbsProps = {
  breadcrumbItems: any;
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbItems }) => {
  return (
    <>
      <div className="text-sm breadcrumbs ml-4">
        <ul>
          {breadcrumbItems.map((item: any, index: any) => (
            <li key={index}>
              {item.link ? (
                <a href={item.link}>
                  {item.labels && item.labels.length > 0 ? (
                    <>
                      {item.labels.map((label: any, labelIndex: any) => (
                        <span key={labelIndex}>{label}</span>
                      ))}
                    </>
                  ) : (
                    item.label
                  )}
                </a>
              ) : (
                <span className="inline-flex gap-2 items-center">
                  {item.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current"
                    >
                      {item.icon}
                    </svg>
                  )}
                  {item.labels && item.labels.length > 0 ? (
                    <>
                      {item.labels.map((label: any, labelIndex: any) => (
                        <span key={labelIndex}>
                          {label.charAt(0).toUpperCase() + label.slice(1)}
                        </span>
                      ))}
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Breadcrumbs;
