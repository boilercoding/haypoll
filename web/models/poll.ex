defmodule Haypoll.Poll do
  use Haypoll.Web, :model

  schema "polls" do
    field :title, :string
    field :closed, :boolean, default: false

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :closed])
    |> validate_required([:title, :closed])
  end
end
