"use client";

import { useState } from "react";

export default function Home() {
  const [doc, setDoc] = useState(null);

  const [form, setForm] = useState({
    type: "invoice",
    customer: { name: "", phone: "" },
    items: [{ name: "", quantity: 1, price: 0 }],
    tax: 0.16,
  });

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-document", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setDoc(data);
  };

  const downloadPDF = async () => {
    const res = await fetch("/api/export/pdf", {
      method: "POST",
      body: JSON.stringify(doc),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    a.click();
  };

  const downloadCSV = async () => {
    const res = await fetch("/api/export/csv", {
      method: "POST",
      body: JSON.stringify(doc),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "document.csv";
    a.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Document Generator</h1>

      <input
        placeholder="Customer Name"
        onChange={(e) =>
          setForm({
            ...form,
            customer: { ...form.customer, name: e.target.value },
          })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setForm({
            ...form,
            customer: { ...form.customer, phone: e.target.value },
          })
        }
      />

      <button onClick={handleGenerate}>Generate</button>

      {doc && (
        <div>
          <h2>Preview</h2>
          <p>{doc.number}</p>
          <p>Total: {doc.total}</p>

          <button onClick={downloadPDF}>Download PDF</button>
          <button onClick={downloadCSV}>Download CSV</button>
        </div>
      )}
    </div>
  );
}
