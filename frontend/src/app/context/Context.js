"use client";

import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const [
        skillsRes,
        experiencesRes,
        projectsRes,
        articlesRes,
        feedbacksRes,
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks`, {
          credentials: "include",
        }),
      ]);

      if (
        !skillsRes ||
        !experiencesRes ||
        !projectsRes ||
        !articlesRes ||
        !feedbacksRes
      ) {
        throw new Error("Some data couldn't be fetched");
      }
      const [
        skillsData,
        experiencesData,
        projectsData,
        articlesData,
        feedbacksData,
      ] = await Promise.all([
        skillsRes.json(),
        experiencesRes.json(),
        projectsRes.json(),
        articlesRes.json(),
        feedbacksRes.json(),
      ]);
      setSkills(skillsData.data);
      setExperiences(experiencesData.data);
      setProjects(projectsData.data);
      setArticles(articlesData.data);
      setFeedbacks(feedbacksData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Context.Provider
      value={{
        loading,
        skills,
        experiences,
        projects,
        articles,
        feedbacks,
        setLoading,
        setExperiences,
        setProjects,
        setArticles,
        setFeedbacks,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useData() {
  return useContext(Context);
}
