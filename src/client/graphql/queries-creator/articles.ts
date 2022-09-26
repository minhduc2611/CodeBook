import ArticleAddInput from 'src/server/article/inputs/article-add.input';
import { AppApolloClient } from '../client';
import { DeleteOneArticleMutation, UpdateOneArticleMutation } from '../queries/articles';

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
  