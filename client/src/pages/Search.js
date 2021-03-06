import styled from 'styled-components';
import PostBoxContainer from '../containers/PostBoxContainer';
import Layout from '../layouts/Layout';

const S = {};

S.Main = styled.main`
  background-color: #fffdf7;
  min-height: 100vh;
  max-width: 1600px;
  margin: 80px auto 0px auto;
  padding: 0 2rem;
`;

S.Message = styled.div`
  font-size: 3rem;
  padding: 5rem 0 4.8rem;
`;

function Search({ isLoading, posts, query }) {
  return (
    <Layout>
      <S.Main>
        {!isLoading && posts && (
          <>
            <S.Message>{`'${query}'에 대한 검색 결과 ${posts.length}개`}</S.Message>
            <PostBoxContainer posts={posts} />
          </>
        )}
      </S.Main>
    </Layout>
  );
}

export default Search;
