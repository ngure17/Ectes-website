"use client";

import DepartmentsTable from "../components/DepartmentsTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Links from "../components/Links";
import { useEffect, useState } from "react";

async function fetchDepartments() {
  const res = await fetch("/api/careers/departments", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }
  return res.json();
}


export default function DepartmentsPage() {
  const router = useRouter(); 

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    fetchDepartments()
      .then((data) => { 
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching departments");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Departments</h1>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => router.push("/admin/dashboard/careers/departments/add")}
          className="justify-end"
        >
          + Add Department
        </Button>
      </div>
      <DepartmentsTable departments={departments}/>
    </div>
  );
}
