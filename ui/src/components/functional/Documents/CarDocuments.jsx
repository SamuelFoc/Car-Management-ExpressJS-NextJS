import Container from "@/components/layout/container/Container";
import DocumentCard from "./DocumentCard";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import AddDocument from "./AddDocument";
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";

export default function CarDocuments({ carId }) {
  const [documents, setDocuments] = useState();
  const [carData, setCarData] = useState();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await apiFetch(`/documents/${carId}`);
        setDocuments(res?.documents || []);
        setCarData(res?.car || null);
      } catch (error) {
        console.error("Error fetching service history:", error.message);
        setDocuments([]);
      }
    };

    fetchDocuments();
  }, [carId]);

  return (
    <Container>
      <AddDocument carId={carId} />
      <ResponsiveGrid wider={true}>
        {documents?.map((document) => {
          return <DocumentCard data={document} carData={carData} />;
        })}
      </ResponsiveGrid>
    </Container>
  );
}
