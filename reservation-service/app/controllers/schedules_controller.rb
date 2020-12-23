# frozen_string_literal: true

class SchedulesController < ApplicationController
  def create
    # If exists, update it
    existing_schedule = Schedule.find_by_org_id(create_schedule_params[:org_id])

    schedule = if existing_schedule.nil?
                 Schedule.new(create_schedule_params)
               else
                 Schedule.update(existing_schedule.id, create_schedule_params)
               end

    if schedule.save
      render json: {
        success: true,
        schedule: schedule.attributes
      }, status: :created
    else
      render json: { success: false, messages: schedule.errors.full_messages }, status: conflict
    end
  rescue StandardError => e
    render json: { success: false, messages: e.message }, status: :conflict
  end

  def update
    schedule = Schedule.find(params[:id])
    if schedule.update!(update_schedule_params)
      render json: { success: true, schedule: schedule.attributes }, status: :ok
    else
      render json: { success: false, messages: schedule.errors.full_messages }, status: :conflict
    end
  rescue StandardError => e
    render json: { success: false, messages: e.message }, status: :conflict
  end

  def org_schedule
    schedule = Schedule.find_by_org_id(params[:org_id])
    if schedule.nil?
      render json: { success: false, message: "Schedule not found for ORG ID #{params[:org_id]}" }, status: :not_found
    else
      render json: { success: true, schedule: schedule.attributes }, status: :ok
    end
  end

  private

  def create_schedule_params
    params.permit(
      :user_id,
      :org_id,
      :availability_per_interval,
      :price_in_cents,
      hours: {
        monday: %i[start end enabled],
        tuesday: %i[start end enabled],
        wednesday: %i[start end enabled],
        thursday: %i[start end enabled],
        friday: %i[start end enabled],
        saturday: %i[start end enabled],
        sunday: %i[start end enabled]
      }
    )
  end

  def update_schedule_params
    params.permit(
      :availability_per_interval,
      :price_in_cents,
      hours: {
        monday: %i[start end enabled],
        tuesday: %i[start end enabled],
        wednesday: %i[start end enabled],
        thursday: %i[start end enabled],
        friday: %i[start end enabled],
        saturday: %i[start end enabled],
        sunday: %i[start end enabled]
      }
    )
  end
end
