export type LoadingStatus = "loading" | "loaded" | "not-loaded";

export interface Document {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
}

export interface Article {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
}

export interface Project {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
  githubURI?: string;
  graphData?: {
    xAxe: string[];
    yAxe: number[];
  };
}

export type Environment = "development" | "staging" | "production";
