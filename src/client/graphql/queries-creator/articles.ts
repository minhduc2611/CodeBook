import { AppApolloClient } from '../client';
import {
  AddOneArticleMutation,
  DeleteOneArticleMutation,
  FetchAllArticleQuery,
  ResponseArticles,
  UpdateOneArticleMutation
} from '../queries/articles';
import ArticleAddInput from './../../../server/article/inputs/article-add.input';

export const fetchAllArticle = async () => {
  let { data } = await AppApolloClient.query<ResponseArticles>({
    query: FetchAllArticleQuery
  });

  // notification manager
  return data.articles;
};

export const deleteArticle = async (id: string) => {
  let { data } = await AppApolloClient.mutate({
    mutation: DeleteOneArticleMutation,
    variables: { id: id }
  });

  // notification manager
  console.log('data', data);
};

export const updateArticle = async (id: string, article: ArticleAddInput) => {
  let { data } = await AppApolloClient.mutate({
    mutation: UpdateOneArticleMutation,
    variables: { id: id, article: article }
  });

  // notification manager
  console.log('data', data);
};

export const addArticle = async (article: ArticleAddInput) => {
  let { data } = await AppApolloClient.mutate({
    mutation: AddOneArticleMutation,
    variables: { article: article }
  });
  // notification manager
  console.log('data', data);
};
