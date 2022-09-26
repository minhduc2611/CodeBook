import gql from 'graphql-tag';
import { Article } from 'src/server/article/entities/article.entity';


export const FetchOneArticleQuery = gql`
  query article($articleSlug: String!) {
    article(articleSlug: $articleSlug) {
      _id
      cellOrder
      articleSlug
      articleTitle
      article {
        content
        id
        type
      }
    }
  }
`;

export type FetchOneArticleResult = {
  article : Article
}

export const DeleteOneArticleMutation = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(_id: $id)
  }
`;


export const UpdateOneArticleMutation = gql`
mutation updateArticle ($id: String!, $article: ArticleAddInput! ) {
  updateArticle(
    _id: $id,
  	input: $article
  )
}
`

