// Component to display key/value attributes as a list of divs (without table)
const AttributeList = ({ attributes }) => (
  <div className="space-y-3 pb-4">
    <div class="border-b-2 border-gray-400 my-4"></div>

    {/* Attribute List Container */}
    <div className="border-t border-gray-200 pt-1">
      {attributes.map((attr, index) => (
        <div
          key={index}
          className="flex justify-between items-start text-small py-3 border-b border-dashed border-gray-200 last:border-b-0"
        >
          {/* Attribute Key (Gray text for secondary info) */}
          <span className="font-medium text-gray-600 min-w-[150px] pr-4 flex-shrink-0 capitalize ">
            {attr.label}
          </span>
          {/* Attribute Value (Black text for primary info) */}
          <span className="text-gray-900 text-right flex-1 font-semibold capitalize ">
            {attr.value}
          </span>
        </div>
      ))}
    </div>
    <div class="border-b-2 border-gray-400 my-4 pb-2"></div>
  </div>
);

// The main component is exported as App to work in the environment.
export default AttributeList;
