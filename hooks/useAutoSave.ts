import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useAutoSave = ({ value, callback, delay = 1000 }) => {
  const debouncedValue = useDebounce(value, delay);

  const [isSaving, SetIsSaving] = useState(false);

  useEffect(() => {
    const saveEntry = async () => {
      SetIsSaving(true);
      if (debouncedValue) {
        try {
          const response = await callback(debouncedValue);
        } catch (error) {
          console.log(error);
        }
      }
      SetIsSaving(false);
    };

    saveEntry();
  }, [debouncedValue]);

  return isSaving;
};

export default useAutoSave;
