export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Max",
    },
  };
}

const UserProfilePage = ({ userName }) => {
  return <h1>{userName}</h1>;
};

export default UserProfilePage;
