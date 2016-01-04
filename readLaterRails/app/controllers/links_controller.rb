class LinksController < ApplicationController
	
	skip_before_action :verify_authenticity_token, only: [:new, :create]

	before_action :authenticate_user!, except: [:create]

	before_action :all_links, only: [:index, :create, :update, :destroy, :tagged]
	before_action :set_links, only: [:edit, :update, :destroy]

	respond_to :html, :json

	def new
		@link = Link.new
	end

	def create
		if user_signed_in?
			@link = current_user.links.build(link_params)
			if @link.save
				@links = @links.where(:read => [false, nil]).order("created_at DESC")
			end
		else
			render :nothing => true, :status => :forbidden
		end
	end

	def update
		@link.update_attributes(link_params)
	end

	def destroy
		@link.destroy
	end

	def index
		if params[:read].present? && params[:read] == 'true'
			@links = @links.where(:read => [true]).order("created_at DESC")
			@title = "Readed links"
		else
			@links = @links.where(:read => [false, nil]).order("updated_at DESC")
			@title = "readLater links"
		end	
	end

	def tagged
		if params[:tag].present? 
			@links = @links.tagged_with(params[:tag])
			@title = params[:tag]
		end  
	end

	private

		def all_links
			if user_signed_in?
				@links = current_user.links.order("created_at DESC").all
			else
				@links = nil
			end
		end

		def set_links
			@link = Link.find(params[:id])
		end

		def link_params
			params.require(:link).permit(:name, :url, :description, :read, :tag_list)
		end
end
