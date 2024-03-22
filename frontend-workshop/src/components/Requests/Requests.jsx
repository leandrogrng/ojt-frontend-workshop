import { SimpleGrid, Box, Heading, Text, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function RequestContent({ data = [] }) {
  return (
    <SimpleGrid columns={2} spacing={7} id='requestGrid'>
      {data?.length > 0 && data.map((request, id) => {
        return (
          <LinkBox as={Box} key={`/requests-${id}`} id='projectContainer'>
            <Heading id='requestName' textAlign={'left'}>
              <LinkOverlay href={`/requests/${request.id}`} fontSize={'2xl'} pl={5}>
                {request.requestSubject}
              </LinkOverlay>
            </Heading>
            <Text textAlign={'left'} pl={5} fontSize={'sm'} color={'grey'}> {`${request.client.name} •  ${request.project.name}`}</Text>
            <Text textAlign={'left'} pt={2} pl={5} fontSize={'md'}>{request.requestDescription}</Text>
          </LinkBox>
        );
      })}
    </SimpleGrid>
  );
}

RequestContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
export default RequestContent;
