"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, DatePicker, TimePicker, Slider, message } from "antd";
import { TbCurrentLocation } from "react-icons/tb";
import { useSendQuotesMutation } from "@/redux/features/quotes/quotesApi";
import { useGetAllCategoryQuery } from "@/redux/features/others/otherApi";
import { useParams } from "next/navigation";

export default function RequestQuoteForm() {
    const {id} = useParams()
  const { data: allCategory } = useGetAllCategoryQuery(undefined);
  // Define the type for category options
  type CategoryOption = {
    label: string;
    value: string;
    subCategories?: {
      label: string;
      value: string;
      parent: string;
    }[];
  };

  // Prepare options for react-select from categories and subcategories
  const categoryOptions: CategoryOption[] = allCategory?.data?.result?.map(
    (service) => ({
      label: service?.category,
      value: service?.category,
      subCategories: service?.subCategory?.map((sub) => ({
        label: sub,
        value: `${service?.category}-${sub}`, // Combining category and subcategory for uniqueness
        parent: service?.category, // Storing parent category to know which category the sub belongs to
      })),
    })
  );

  const [isClient, setIsClient] = useState(false);
  const [sendQuote] = useSendQuotesMutation();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { control, register, handleSubmit } = useForm({
    // no defaultValues needed here
  });

  const onSubmit = async (data) => {
    const modifiedData={
        ...data,
        contractorId:id
    }
    try {
      const res = await sendQuote(modifiedData).unwrap();
      if (res?.success) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  if (!isClient) {
    return null; // Prevent server render mismatch by rendering nothing initially
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 sm:p-6 bg-card border border-border rounded-xl shadow-lg space-y-6 my-4 sm:my-5"
    >
      <div className="border-primary border-b-2">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
          Request A Quote
        </h2>
        <p className="text-muted-foreground mb-6">
          Provide information about your needs!
        </p>
      </div>

      <div className="relative">
        <label className="font-semibold mb-1 block">Project Location</label>
        <input
          {...register("projectLocation")}
          className="w-full border border-border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          placeholder="Enter project location"
        />
        <TbCurrentLocation
          className="absolute right-3 top-[51px] transform -translate-y-1/2 text-foreground pointer-events-none"
          size={20}
        />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Service Needed</label>
        <Controller
          name="services"
          control={control}
          render={({ field }) => (
            <Select
              mode="multiple"
              allowClear
              placeholder="Select services"
              className="w-full"
              {...field}
              onChange={(val) => field.onChange(val)}
              options={categoryOptions}
            />
          )}
        />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Project Description</label>
        <textarea
          {...register("projectDescription")}
          rows={4}
          placeholder="Tell us more about your projects"
          className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <div className="flex-1">
          <label className="font-semibold mb-1 flex items-center space-x-2">
            <span>Date</span>
            <span className="underline cursor-pointer text-primary text-sm font-normal hover:text-primary/80">
              Choose a date
            </span>
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                className="w-full"
                onChange={(date) => field.onChange(date)}
                value={field.value}
                format="YYYY-MM-DD"
              />
            )}
          />
        </div>

        <div className="flex-1 mt-4 sm:mt-0">
          <label className="font-semibold mb-1 flex items-center space-x-2">
            <span>Time</span>
            <span className="underline cursor-pointer text-primary text-sm font-normal hover:text-primary/80">
              Pick a time
            </span>
          </label>
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <TimePicker
                className="w-full"
                format="HH:mm"
                onChange={(time) => field.onChange(time)}
                value={field.value}
                use12Hours={false}
              />
            )}
          />
        </div>
      </div>

      {/* <div>
        <label className="font-semibold mb-2 block">Offer a Price</label>
        <Controller
          control={control}
          name="priceRange"
          render={({ field }) => (
            <>
              <Slider
                range
                min={10}
                max={1000}
                value={field.value || [10, 1000]}
                onChange={field.onChange}
                tooltipVisible
              />
              <div className="flex justify-between text-xs mt-1 px-1 text-gray-500">
                <div>
                  <label className="block">Minimum</label>
                  <input
                    type="number"
                    min={10}
                    max={field.value ? field.value[1] : 1000}
                    className="w-16 border border-gray-300 rounded p-1"
                    value={field.value ? field.value[0] : 10}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (field.value && val <= field.value[1]) {
                        field.onChange([val, field.value[1]]);
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block">Maximum</label>
                  <input
                    type="number"
                    min={field.value ? field.value[0] : 10}
                    max={1000}
                    className="w-20 border border-gray-300 rounded p-1"
                    value={field.value ? field.value[1] : 1000}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (field.value && val >= field.value[0]) {
                        field.onChange([field.value[0], val]);
                      }
                    }}
                  />
                </div>
              </div>
            </>
          )}
        />
      </div> */}
      <div>
        <label className="font-semibold mb-2 block">Offer a Price</label>
        <Controller
          control={control}
          name="priceRange"
          render={({ field }) => {
            // Parse stored string into array [min, max]
            const currentRange = field.value
              ? field.value.split("-").map((n: string) => Number(n))
              : [10, 1000];

            const handleChange = (newRange: number[]) => {
              // Save as string "min-max"
              field.onChange(`${newRange[0]}-${newRange[1]}`);
            };

            return (
              <>
                <Slider
                  range
                  min={10}
                  max={1000}
                  value={currentRange}
                  onChange={handleChange}
                  tooltipVisible
                />
                <div className="flex justify-between text-xs mt-1 px-1 text-muted-foreground">
                  <div>
                    <label className="block">Minimum</label>
                    <input
                      type="number"
                      min={10}
                      max={currentRange[1]}
                      className="w-16 border border-border rounded p-1 bg-background text-foreground"
                      value={currentRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= currentRange[1]) {
                          handleChange([val, currentRange[1]]);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block">Maximum</label>
                    <input
                      type="number"
                      min={currentRange[0]}
                      max={1000}
                      className="w-20 border border-border rounded p-1 bg-background text-foreground"
                      value={currentRange[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= currentRange[0]) {
                          handleChange([currentRange[0], val]);
                        }
                      }}
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Request Quote
      </button>
    </form>
  );
}
