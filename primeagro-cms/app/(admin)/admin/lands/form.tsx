"use client";

import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";

const soilTypeOptions = [
  { label: "Select soil type", value: "" },
  { label: "Clay", value: "Clay" },
  { label: "Sandy", value: "Sandy" },
  { label: "Loam", value: "Loam" },
  { label: "Silt", value: "Silt" },
  { label: "Black", value: "Black" },
];

const topographyOptions = [
  { label: "Select topography", value: "" },
  { label: "Flat", value: "Flat" },
  { label: "Hilly", value: "Hilly" },
  { label: "Mixed", value: "Mixed" },
];

const fencingOptions = [
  { label: "Select fencing", value: "" },
  { label: "Fully Fenced", value: "Fully Fenced" },
  { label: "Partially", value: "Partially" },
  { label: "None", value: "None" },
];

const irrigationOptions = [
  { label: "Select irrigation", value: "" },
  { label: "Drip", value: "Drip" },
  { label: "Sprinkler", value: "Sprinkler" },
  { label: "Flood", value: "Flood" },
  { label: "Well", value: "Well" },
  { label: "None", value: "None" },
];

const waterSourceOptions = [
  { label: "Select water source", value: "" },
  { label: "Borewell", value: "Borewell" },
  { label: "Canal", value: "Canal" },
  { label: "River", value: "River" },
  { label: "Lake", value: "Lake" },
];

const waterAvailabilityOptions = [
  { label: "Select availability", value: "" },
  { label: "Year-round", value: "Year-round" },
  { label: "Seasonal", value: "Seasonal" },
];

const statusOptions = [
  { label: "Available", value: "Available" },
  { label: "Sold", value: "Sold" },
  { label: "Reserved", value: "Reserved" },
  { label: "Coming Soon", value: "Coming Soon" },
];

export default function LandForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);

    const res = await fetch(`/api/lands${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        totalAcreage: Number(data.totalAcreage),
        availableAcreage: data.availableAcreage ? Number(data.availableAcreage) : null,
        pricePerAcre: data.pricePerAcre ? Number(data.pricePerAcre) : null,
        totalPrice: data.totalPrice ? Number(data.totalPrice) : null,
        electricity: data.electricity === "true",
        roadAccess: data.roadAccess === "true",
        storageFacility: data.storageFacility === "true",
        farmHouse: data.farmHouse === "true",
        priceNegotiable: data.priceNegotiable === "true",
        legalClearTitle: data.legalClearTitle === "true",
        featured: data.featured === "true",
      }),
    });

    if (res.ok) router.push("/admin/lands");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Farm Land</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Title" name="title" defaultValue={item?.title} required />
          <FormField label="Slug" name="slug" defaultValue={item?.slug} placeholder="Leave blank to auto-generate" />
          <FormField label="Location" name="location" defaultValue={item?.location} required />
          <FormField label="District" name="district" defaultValue={item?.district} />
          <FormField label="State" name="state" defaultValue={item?.state} />
          <FormField label="Pincode" name="pincode" defaultValue={item?.pincode} />
          <FormField label="Map Coordinates" name="mapCoordinates" defaultValue={item?.mapCoordinates} placeholder="lat,lng" />
          <FormField label="Total Acreage" name="totalAcreage" type="number" defaultValue={item?.totalAcreage} required />
          <FormField label="Available Acreage" name="availableAcreage" type="number" defaultValue={item?.availableAcreage} />
          <FormField label="Soil Type" name="soilType" type="select" options={soilTypeOptions} defaultValue={item?.soilType} />
          <FormField label="Topography" name="topography" type="select" options={topographyOptions} defaultValue={item?.topography} />
          <FormField label="Fencing Status" name="fencingStatus" type="select" options={fencingOptions} defaultValue={item?.fencingStatus} />
          <FormField label="Irrigation Type" name="irrigationType" type="select" options={irrigationOptions} defaultValue={item?.irrigationType} />
          <FormField label="Water Source" name="waterSource" type="select" options={waterSourceOptions} defaultValue={item?.waterSource} />
          <FormField label="Water Availability" name="waterAvailability" type="select" options={waterAvailabilityOptions} defaultValue={item?.waterAvailability} />
          <FormField label="Water Quality" name="waterQuality" defaultValue={item?.waterQuality} />
          <FormField label="Electricity" name="electricity" type="checkbox" defaultValue={item?.electricity ?? false} />
          <FormField label="Road Access" name="roadAccess" type="checkbox" defaultValue={item?.roadAccess ?? false} />
          <FormField label="Storage Facility" name="storageFacility" type="checkbox" defaultValue={item?.storageFacility ?? false} />
          <FormField label="Farm House" name="farmHouse" type="checkbox" defaultValue={item?.farmHouse ?? false} />
          <FormField label="Price Per Acre" name="pricePerAcre" type="number" defaultValue={item?.pricePerAcre} />
          <FormField label="Total Price" name="totalPrice" type="number" defaultValue={item?.totalPrice} />
          <FormField label="Price Negotiable" name="priceNegotiable" type="checkbox" defaultValue={item?.priceNegotiable ?? false} />
          <FormField label="Legal Clear Title" name="legalClearTitle" type="checkbox" defaultValue={item?.legalClearTitle ?? false} />
          <FormField label="Registration Status" name="registrationStatus" defaultValue={item?.registrationStatus} />
          <FormField label="Status" name="status" type="select" options={statusOptions} defaultValue={item?.status || "Available"} />
          <FormField label="Available From" name="availableFrom" defaultValue={item?.availableFrom} placeholder="e.g. June 2026" />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
          <FormField label="Featured Image URL" name="featuredImage" defaultValue={item?.featuredImage} />
          <FormField label="Gallery (JSON)" name="gallery" defaultValue={item?.gallery} placeholder='["url1","url2"]' />
          <FormField label="Drone Video URL" name="droneVideoUrl" defaultValue={item?.droneVideoUrl} />
          <FormField label="Virtual Tour URL" name="virtualTourUrl" defaultValue={item?.virtualTourUrl} />
          <FormField label="Meta Title" name="metaTitle" defaultValue={item?.metaTitle} />
          <FormField label="Meta Description" name="metaDesc" defaultValue={item?.metaDesc} />
        </div>
        <FormField label="Infrastructure" name="infrastructure" type="textarea" rows={3} defaultValue={item?.infrastructure} />
        <FormField label="Documentation" name="documentation" type="textarea" rows={3} defaultValue={item?.documentation} />
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Land
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
