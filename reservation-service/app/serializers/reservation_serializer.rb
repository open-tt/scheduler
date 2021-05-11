class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :host, :recipient, :recipient_rsvp, :kind, :note, :event_date, :start_time, :end_time,
  :duration_in_minutes

  def event_date
    DateTime.strptime(@object.start_timestamp.to_s, '%s').strftime('%B %d, %Y')
  end

  def start_time
    # %l - Hour of the day, 12-hour clock, blank-padded ( 1..12)
    # %p - Meridian indicator, uppercase (``AM'' or ``PM'')
    DateTime.strptime(@object.start_timestamp.to_s, '%s').strftime('%l:%M %p').strip
  end

  def end_time
    DateTime.strptime(@object.end_timestamp.to_s, '%s').strftime('%l:%M %p').strip
  end

  def duration_in_minutes
    (@object.end_timestamp - @object.start_timestamp) * 60
  end
end
