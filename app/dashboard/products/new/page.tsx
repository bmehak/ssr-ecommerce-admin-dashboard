"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/zod-schemas";
import ImageUpload from "@/components/ImageUpload";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { stepOneSchema } from "@/lib/zod-schemas";

function validateStepOne(form: {
  name: string;
  description: string;
  category: string;
}) {
  return productSchema
    .pick({
      name: true,
      description: true,
      category: true,
    })
    .safeParse(form);
}

export default function NewProductPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
  });

const nextStep = () => {
  const stepOneData = {
    name: formData.name,
    description: formData.description,
    category: formData.category,
  };

  const validation = stepOneSchema.safeParse(stepOneData);

  if (!validation.success) {
    const firstError = validation.error.issues[0].message;
    toast.error(firstError);
    return;
  }

  setStep(2);
};
const prevStep = () => setStep(1);

  async function handleSubmit() {
    console.log("Submitting formData:", formData);

    const validation = productSchema.safeParse(formData);
    
    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data), 
      });

      if (res.ok) {
        toast.success("Product created successfully!");
        router.push("/dashboard/products");
        router.refresh(); 
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        toast.error(errorData.message || "Failed to save to database");
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1 style={{ color: "#fff" }}>Add Product</h1>
        <span style={{ color: "#888" }}>Step {step} of 2</span>
      </div>

      {step === 1 && (
        <div style={formWrapper}>
          <label style={labelStyle}>Product Name</label>
          <input 
            style={inputStyle}
            placeholder="e.g. Wireless Headphones"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <label style={labelStyle}>Description</label>
          <textarea 
            style={{...inputStyle, height: "100px", resize: "none"}}
            placeholder="Tell us about the product..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <label style={labelStyle}>Category</label>
          <select 
            style={inputStyle}
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>

          <button onClick={nextStep} style={primaryBtn}>Next: Pricing & Image</button>
        </div>
      )}

      {step === 2 && (
        <div style={formWrapper}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Price (₹)</label>
              <input 
                type="number"
                style={inputStyle}
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Stock</label>
              <input 
                type="number"
                style={inputStyle}
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>
          </div>

          <label style={labelStyle}>Product Image</label>
          <ImageUpload onUpload={(url) => setFormData({...formData, image: url})} />

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="button" onClick={prevStep} style={secondaryBtn}>Back</button>
            <button 
              type="button"
              onClick={handleSubmit} 
              disabled={loading} 
              style={primaryBtn}
            >
              {loading ? "Creating..." : "Complete & Create"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const formWrapper = { display: "flex", flexDirection: "column" as const, gap: "15px" };
const labelStyle = { fontSize: "14px", fontWeight: "600", color: "#888" };
const inputStyle = { 
  padding: "12px", 
  borderRadius: "6px", 
  border: "1px solid #333", 
  fontSize: "16px", 
  background: "#111", 
  color: "#fff" 
};
const primaryBtn = { 
  padding: "12px", 
  background: "#fff", 
  color: "#000", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer", 
  fontWeight: "bold" as const 
};
const secondaryBtn = { 
  padding: "12px", 
  background: "#333", 
  color: "#fff", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer", 
  flex: 1 
};