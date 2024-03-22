import '../../App.css'
import { Button } from '@chakra-ui/react';
import mockApi from '../../utils/mockApi';

function Home () {
  const handleCancel = () => {
    mockApi("POST", '/reset-data');
    window.location.reload();
  };

  return (
    <>
      <h1 id='home'> HELLO WORLD! </h1>
      <Button
        data-test-id='btn-reset-home' 
        colorScheme = 'orange' 
        onClick = {handleCancel}>
        Reset
      </Button>
    </>
  )
}
export default Home;
