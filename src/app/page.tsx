export default function Home() {
  const array = Array.from({ length: 10 }, () => []);
  return (
    <div>
      {array.map((item, index) => {
        return (
          <>
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              repudiandae omnis tempore beatae a quis inventore aspernatur odio
              mollitia cum totam provident suscipit, corrupti voluptatibus
              laboriosam expedita asperiores ab dolor?
            </p>
            <br />
          </>
        );
      })}
    </div>
  );
}
