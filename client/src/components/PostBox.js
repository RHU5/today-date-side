import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const S = {};

S.PostBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-template-rows: repeat(4, max-content);
  gap: 2rem;
`;

S.Post = styled.div`
  border-radius: 0.5rem;
  background-color: transparent;
  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

S.PostTitle = styled.h2`
  margin-top: 1rem;
  font-size: 3rem;
`;

S.PostInfo = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 2.5rem;
  margin-top: 0.5rem;
`;

S.PaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  .pagination-ul {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    width: 250px;
    padding: 5rem auto 0;
  }
  li {
    cursor: pointer;
  }
`;

S.NoDataContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
`;

function PostBox({ currentPageData, pageCount, onChangePage, onChangeArea }) {
  if (!currentPageData.length) {
    return <S.NoDataContainer>작성된 게시글이 없습니다.</S.NoDataContainer>;
  }
  return (
    <>
      <S.PostBox>
        {currentPageData
          .map((post) => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <S.Post>
                <img src={post.imgURL[0]} alt="" />
                <S.PostTitle>{post.title}</S.PostTitle>
                <S.PostInfo>
                  <span>{post.creator.nickname}</span>
                  <span>{post.area}</span>
                </S.PostInfo>
              </S.Post>
            </Link>
          ))
          .reverse()}
      </S.PostBox>
      <S.PaginateContainer>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          breakLabel={'...'}
          previousLabel={'이전'}
          nextLabel={'다음'}
          onPageChange={onChangePage}
          containerClassName={'pagination-ul'}
          activeClassName={'currentPage'}
          previousClassName={'pageLabel-btn'}
          nextClassName={'pageLabel-btn'}
        />
      </S.PaginateContainer>
    </>
  );
}

export default PostBox;
