import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import * as LucideIcons from "lucide-react";

const SelectCombobox = ({ selectedServices, setSelectedServices, user }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://harftibackend-production.up.railway.app/services")
      .then((res) => {
        if (res.data.status === "success") {
          const formattedOptions = res.data.services.map((service) => ({
            value: service.title,
            label: service.title,
            icon: LucideIcons[service.icon]
              ? React.createElement(LucideIcons[service.icon], { className: "w-4 h-4 text-black" })
              : null,
          }));

          setServices(formattedOptions);

          if (user?.service) {
            const preselected = formattedOptions.filter((option) => user.service.includes(option.value));
            setSelectedServices(preselected);
          }
        }
      })
      .catch((err) => console.error(err));
  }, [user?.service]);

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length <= 4) {
      setSelectedServices(selectedOptions);
    }
  };

  console.log(selectedServices); // Debugging

  return (
    <div className="h-[35px] w-70 mx-auto">
      <Select
        options={services}
        isMulti
        value={selectedServices}
        onChange={handleChange}
        placeholder="Choose services (Max: 4)..."
        className="text-black"
        menuPortalTarget={document.body}
        isOptionDisabled={() => selectedServices.length >= 4}
        styles={{
          control: (base) => ({
            ...base,
            display: "flex",
            flexWrap: "nowrap", // Prevents wrapping
            overflowX: "auto", // Enables horizontal scrolling
            whiteSpace: "nowrap",
            height: "35px", // Set fixed height
            width: "280px", // Adjust width to match w-70
          }),
          multiValue: (base) => ({
            ...base,
            display: "inline-flex",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }),
          valueContainer: (base) => ({
            ...base,
            overflowX: "auto",
            flexWrap: "nowrap",
            display: "flex",
            alignItems: "center",
          }),
        }}
      />
    </div>
  );
};

export default SelectCombobox;
