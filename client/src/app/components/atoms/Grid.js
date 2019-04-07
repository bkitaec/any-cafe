import { Grid as PUIGrid } from '@mic3/platform-ui';
import styled from 'styled-components';

const Grid = styled(PUIGrid)`
    ${({ grow }) => (grow ? 'flex-grow: 1;' : '')}
`;

export default Grid;
