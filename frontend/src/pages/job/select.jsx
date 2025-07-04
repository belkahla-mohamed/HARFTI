import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import axios from "axios";

const Combobox = ({ setServicesTitle }) => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({ title: "All Workers" });
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const serviceDefault = { title: "All Workers" };

  // Fetch services from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/services")
      .then((res) => {
        if (res.data.status === "success") {
          setServices(res.data.services);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter services based on search input
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setServicesTitle(selectedService.title);
  }, [selectedService])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpen(!open)}
          className="sm:w-[50%] w-full  flex justify-between items-center px-4 py-2 border border-gray-300 rounded cursor-pointer bg-white shadow-sm"
        >
          <span >{selectedService ? selectedService.title : "Select service..."}</span>
          <ChevronsUpDown className="opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full  bg-white shadow-md p-2 rounded-md border">
        {/* Search Input */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Services List */}
        <div className="flex flex-col space-y-2">
          <button
            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedService.title === "All Workers" ? "bg-gray-200" : ""
              }`}
            onClick={() => {
              setSelectedService(serviceDefault);
              setOpen(false);
              setSearch("");
            }}
          >
            All Workers {selectedService.title === 'All Workers' && <Check className="w-4 h-4" />}
          </button>
          {filteredServices.length > 0 ? (

            filteredServices.map((service) => (
              <button
                key={service._id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedService?._id === service._id ? "bg-gray-200" : ""
                  }`}
                onClick={() => {
                  setSelectedService(service);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {service.title}
                {selectedService?._id === service._id && <Check className="w-4 h-4" />}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No results found.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
