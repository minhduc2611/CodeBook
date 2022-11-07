import { ApolloResponse } from 'src/client/state/types/base';
import { Article } from 'src/server/article/entities/article.entity';
import { AppApolloClient } from '../client';
import {
  AddOneArticleMutation,
  DeleteOneArticleMutation,
  FetchAllArticleQuery,
  FetchOneArticleQuery,
  UpdateOneArticleMutation
} from '../queries/articles';
import ArticleAddInput from './../../../server/article/inputs/article-add.input';

export const fetchAllArticle = async (): Promise<Article[]> => {
  const { data } = await AppApolloClient.query<
    ApolloResponse<Article[], 'articles'>
  >({
    query: FetchAllArticleQuery
  });

  //todo notification manager
  return data.articles;
};
export const fetchOneArticleBySlug = async (slug: string): Promise<Article> => {
  const { data } = await AppApolloClient.query<
    ApolloResponse<Article, 'article'>
  >({
    query: FetchOneArticleQuery,
    variables: { articleSlug: slug }
  });
  console.log('datdatadatadatadatadataa', data)
  //todo notification manager
  return data.article;
};

export const deleteArticle = async (id: string) => {
  const { data } = await AppApolloClient.mutate({
    mutation: DeleteOneArticleMutation,
    variables: { id: id }
  });

  // notification manager
  console.log('data', data);
};

export const updateArticle = async (id: string, article: ArticleAddInput) => {
  const { data } = await AppApolloClient.mutate({
    mutation: UpdateOneArticleMutation,
    variables: { id: id, article: article }
  });

  // notification manager
  console.log('data', data);
};

export const addArticle = async (article: ArticleAddInput) => {
  const { data } = await AppApolloClient.mutate({
    mutation: AddOneArticleMutation,
    variables: { article: article }
  });
  // notification manager
  console.log('data', data);
};
