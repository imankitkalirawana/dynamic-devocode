import React, { useState } from "react";
import resourceTypes from "@/utils/resourceTypes";

type ResourceProps = {
  lastItem: any;
};

const Resource: React.FC<ResourceProps> = ({ lastItem }) => {
  const [selectedType, setSelectedType] = useState("others");

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value);
  };
  const resourceType = resourceTypes.filter((type) => type != "all");
  return (
    <>
      <form className="modal-box max-w-96">
        <h2 className="text-lg text-center font-semibold">
          Add to {lastItem.label}
        </h2>
        <div className="mx-auto flex flex-col mb-8 overflow-y-scroll px-4 py-2 gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="resource_type" className="label">
              <span className="label-text">Resource Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleTypeChange}
              defaultValue={selectedType}
            >
              {resourceType.map((type, index) => (
                <option key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* elements added based on user selection */}
          {selectedType === "link" || selectedType === "moocs" ? (
            <div className="flex flex-col w-full">
              <label htmlFor="url" className="label">
                <span className="label-text">URL</span>
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="input input-bordered w-full"
              />
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <label htmlFor="file" className="label">
                <span className="label-text">File</span>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="file-input file-input-bordered w-full"
              />
            </div>
          )}
        </div>
        <div className="flex modal-action">
          <button className="btn btn-primary flex-1" type="submit">
            Add
          </button>
          <label className="btn flex-1" htmlFor="add_subject">
            Cancel
          </label>
        </div>
      </form>
    </>
  );
};

export default Resource;
