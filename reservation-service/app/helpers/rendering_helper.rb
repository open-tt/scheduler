module RenderingHelper
  # @param [StandardError] error
  def render_exception_as_json(error)
    render json: { success: false, error: error.message }, status: :unprocessable_entity
  end

  def render_created_object(obj)
    render json: obj.attributes, status: :created
  end

  def render_failed_create_new_object(obj)
    render json: { messages: obj.errors.full_messages }, status: :unprocessable_entity
  end

  def render_failed_update_object(obj)
    render json: { success: false, errors: obj.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found(class_name, id)
    render json: { message: "#{class_name} not found with ID #{id}" }, status: :not_found
  end

  def render_object(obj)
    name = obj.class.name.downcase
    render json: { success: true, "#{name}": obj.attributes }, status: :ok
  end

  def render_object_array(arr)
    render json: arr.map(&:attributes), status: :ok
  end
end
