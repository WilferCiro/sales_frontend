"use client";
import { IconBrandNextjs } from "@tabler/icons-react";
import BlogCard from "../../molecules/BlogCard";
import FileIconsNestjs from "../../atoms/icons/FileIconsNestjs";

import styles from "./styles.module.css";

interface SourceInterface {
  title: string;
  technologies: string[];
  description: string;
  repository: string;
  icon: React.ReactElement;
}

const sourceCode: SourceInterface[] = [
  {
    title: "Front end",
    technologies: ["Nextjs v13", "Mantine", "React query"],
    description:
      "Backoffice creado para gestionar todos los datos de la aplicación, utiliza SSR",
    repository: "https://github.com/WilferCiro/sales_frontend.git",
    icon: <IconBrandNextjs size={"2em"} />,
  },
  {
    title: "Back end sales",
    technologies: ["Nestjs", "Hexagonal", "MongoDB"],
    description:
      "Back end creado para la gestión de las ventas, utiliza mongodb como base de datos",
    repository: "https://github.com/WilferCiro/sales_backend.git",
    icon: <FileIconsNestjs fontSize={"2em"} />,
  },
  {
    title: "Back end backoffice",
    technologies: ["Nestjs", "Hexagonal", "Postgresql"],
    description:
      "Backend creado para la gestión de toda la información del backoffice",
    repository: "https://github.com/WilferCiro/sales_dashboard_backend.git",
    icon: <FileIconsNestjs fontSize={"2em"} />,
  },
];

const CardsProjectLinks = () => {
  return (
    <div id="source-code" className={styles.source_code}>
      {sourceCode.map((source: SourceInterface) => {
        return (
          <BlogCard
            title={source.title}
            link={source.repository}
            description={source.description}
            key={source.title}
            icon={source.icon}
            technologies={source.technologies}
          />
        );
      })}
    </div>
  );
};

export default CardsProjectLinks;
