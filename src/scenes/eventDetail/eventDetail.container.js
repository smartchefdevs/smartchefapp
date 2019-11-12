import {connect} from 'react-redux';

import EventDetailScreen from './eventDetail.screen';
import EventsActions from 'smartchef/src/services/events/events.reducers';

const mapStateToProps = state => ({
  eventDetail: state.events.get('eventDetail'),
});

const mapStateToDispatch = dispatch => ({
  getEventDetail: id => dispatch(EventsActions.getEventDetail(id)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(EventDetailScreen);
